package com.aurora.service.impl;

import cn.dev33.satoken.stp.StpUtil;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.aurora.dto.article.ArticleQueryDTO;
import com.aurora.dto.article.ArticleSaveDTO;
import com.aurora.entity.*;
import com.aurora.mapper.*;
import com.aurora.service.ArticleService;
import com.aurora.vo.article.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *   文章 Service 实现类
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
@Service
@RequiredArgsConstructor
public class ArticleServiceImpl implements ArticleService {

    private final ArticleMapper articleMapper;
    private final CategoryMapper categoryMapper;
    private final TagMapper tagMapper;
    private final ArticleCategoryMapper articleCategoryMapper;
    private final ArticleTagMapper articleTagMapper;
    private final ArticleLikeMapper articleLikeMapper;
    private final ArticleFavoriteMapper articleFavoriteMapper;

    @Override
    public IPage<ArticleListVO> listArticles(ArticleQueryDTO queryDTO) {
        Page<Article> page = new Page<>(queryDTO.getPageNum(), queryDTO.getPageSize());

        LambdaQueryWrapper<Article> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Article::getStatus, 1)
                .like(queryDTO.getTitle() != null, Article::getTitle, queryDTO.getTitle())
                .eq(queryDTO.getAuthorId() != null, Article::getAuthorId, queryDTO.getAuthorId())
                .orderByDesc(Article::getIsTop)
                .orderByDesc(Article::getCreateTime);

        IPage<Article> articlePage = articleMapper.selectPage(page, wrapper);

        return articlePage.convert(this::convertToListVO);
    }

    @Override
    public ArticleDetailVO getArticleDetail(Long id) {
        Article article = articleMapper.selectById(id);
        if (article == null || article.getStatus() != 1) {
            return null;
        }

        ArticleDetailVO vo = convertToDetailVO(article);

        Long currentUserId = StpUtil.getLoginIdAsLong();
        if (currentUserId != null) {
            LambdaQueryWrapper<ArticleLike> likeWrapper = new LambdaQueryWrapper<>();
            likeWrapper.eq(ArticleLike::getUserId, currentUserId)
                    .eq(ArticleLike::getArticleId, id);
            vo.setIsLiked(articleLikeMapper.selectCount(likeWrapper) > 0);

            LambdaQueryWrapper<ArticleFavorite> favoriteWrapper = new LambdaQueryWrapper<>();
            favoriteWrapper.eq(ArticleFavorite::getUserId, currentUserId)
                    .eq(ArticleFavorite::getArticleId, id);
            vo.setIsFavorited(articleFavoriteMapper.selectCount(favoriteWrapper) > 0);
        }

        article.setViewCount(article.getViewCount() + 1);
        articleMapper.updateById(article);

        return vo;
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Long saveArticle(ArticleSaveDTO saveDTO) {
        Long userId = StpUtil.getLoginIdAsLong();

        Article article = Article.builder()
                .title(saveDTO.getTitle())
                .content(saveDTO.getContent())
                .summary(saveDTO.getSummary())
                .coverImage(saveDTO.getCoverImage())
                .authorId(userId)
                .status(saveDTO.getStatus() != null ? saveDTO.getStatus() : 1)
                .isTop(0)
                .isRecommend(0)
                .viewCount(0)
                .likeCount(0)
                .commentCount(0)
                .favoriteCount(0)
                .build();

        articleMapper.insert(article);

        saveArticleRelations(article.getId(), saveDTO.getCategoryIds(), saveDTO.getTagIds());

        return article.getId();
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void updateArticle(Long id, ArticleSaveDTO saveDTO) {
        Article article = articleMapper.selectById(id);
        Long userId = StpUtil.getLoginIdAsLong();

        if (article == null || !article.getAuthorId().equals(userId)) {
            throw new RuntimeException("无权限修改此文章");
        }

        article.setTitle(saveDTO.getTitle());
        article.setContent(saveDTO.getContent());
        article.setSummary(saveDTO.getSummary());
        article.setCoverImage(saveDTO.getCoverImage());
        if (saveDTO.getStatus() != null) {
            article.setStatus(saveDTO.getStatus());
        }

        articleMapper.updateById(article);

        deleteArticleRelations(id);
        saveArticleRelations(id, saveDTO.getCategoryIds(), saveDTO.getTagIds());
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deleteArticle(Long id) {
        Article article = articleMapper.selectById(id);
        Long userId = StpUtil.getLoginIdAsLong();

        if (article == null || !article.getAuthorId().equals(userId)) {
            throw new RuntimeException("无权限删除此文章");
        }

        article.setStatus(2);
        articleMapper.updateById(article);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void likeArticle(Long articleId) {
        Long userId = StpUtil.getLoginIdAsLong();

        LambdaQueryWrapper<ArticleLike> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(ArticleLike::getUserId, userId)
                .eq(ArticleLike::getArticleId, articleId);

        if (articleLikeMapper.selectCount(wrapper) > 0) {
            return;
        }

        ArticleLike like = ArticleLike.builder()
                .userId(userId)
                .articleId(articleId)
                .build();
        articleLikeMapper.insert(like);

        Article article = articleMapper.selectById(articleId);
        if (article != null) {
            article.setLikeCount(article.getLikeCount() + 1);
            articleMapper.updateById(article);
        }
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void unlikeArticle(Long articleId) {
        Long userId = StpUtil.getLoginIdAsLong();

        LambdaQueryWrapper<ArticleLike> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(ArticleLike::getUserId, userId)
                .eq(ArticleLike::getArticleId, articleId);

        articleLikeMapper.delete(wrapper);

        Article article = articleMapper.selectById(articleId);
        if (article != null && article.getLikeCount() > 0) {
            article.setLikeCount(article.getLikeCount() - 1);
            articleMapper.updateById(article);
        }
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void favoriteArticle(Long articleId) {
        Long userId = StpUtil.getLoginIdAsLong();

        LambdaQueryWrapper<ArticleFavorite> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(ArticleFavorite::getUserId, userId)
                .eq(ArticleFavorite::getArticleId, articleId);

        if (articleFavoriteMapper.selectCount(wrapper) > 0) {
            return;
        }

        ArticleFavorite favorite = ArticleFavorite.builder()
                .userId(userId)
                .articleId(articleId)
                .build();
        articleFavoriteMapper.insert(favorite);

        Article article = articleMapper.selectById(articleId);
        if (article != null) {
            article.setFavoriteCount(article.getFavoriteCount() + 1);
            articleMapper.updateById(article);
        }
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void unfavoriteArticle(Long articleId) {
        Long userId = StpUtil.getLoginIdAsLong();

        LambdaQueryWrapper<ArticleFavorite> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(ArticleFavorite::getUserId, userId)
                .eq(ArticleFavorite::getArticleId, articleId);

        articleFavoriteMapper.delete(wrapper);

        Article article = articleMapper.selectById(articleId);
        if (article != null && article.getFavoriteCount() > 0) {
            article.setFavoriteCount(article.getFavoriteCount() - 1);
            articleMapper.updateById(article);
        }
    }

    @Override
    public IPage<ArticleListVO> listUserArticles(Long userId, Integer pageNum, Integer pageSize) {
        Page<Article> page = new Page<>(pageNum, pageSize);

        LambdaQueryWrapper<Article> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Article::getAuthorId, userId)
                .eq(Article::getStatus, 1)
                .orderByDesc(Article::getCreateTime);

        IPage<Article> articlePage = articleMapper.selectPage(page, wrapper);
        return articlePage.convert(this::convertToListVO);
    }

    @Override
    public IPage<ArticleListVO> listHotArticles(Integer pageNum, Integer pageSize) {
        Page<Article> page = new Page<>(pageNum, pageSize);

        LambdaQueryWrapper<Article> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Article::getStatus, 1)
                .orderByDesc(Article::getViewCount)
                .orderByDesc(Article::getCreateTime);

        IPage<Article> articlePage = articleMapper.selectPage(page, wrapper);
        return articlePage.convert(this::convertToListVO);
    }

    @Override
    public IPage<ArticleListVO> listRecommendArticles(Integer pageNum, Integer pageSize) {
        Page<Article> page = new Page<>(pageNum, pageSize);

        LambdaQueryWrapper<Article> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Article::getStatus, 1)
                .eq(Article::getIsRecommend, 1)
                .orderByDesc(Article::getCreateTime);

        IPage<Article> articlePage = articleMapper.selectPage(page, wrapper);
        return articlePage.convert(this::convertToListVO);
    }

    private ArticleListVO convertToListVO(Article article) {
        ArticleListVO vo = new ArticleListVO();
        vo.setId(article.getId());
        vo.setTitle(article.getTitle());
        vo.setSummary(article.getSummary());
        vo.setCoverImage(article.getCoverImage());
        vo.setAuthorId(article.getAuthorId());
        vo.setViewCount(article.getViewCount());
        vo.setLikeCount(article.getLikeCount());
        vo.setCommentCount(article.getCommentCount());
        vo.setFavoriteCount(article.getFavoriteCount());
        vo.setIsTop(article.getIsTop());
        vo.setIsRecommend(article.getIsRecommend());
        vo.setCreateTime(article.getCreateTime());

        vo.setCategories(getArticleCategories(article.getId()));
        vo.setTags(getArticleTags(article.getId()));

        return vo;
    }

    private ArticleDetailVO convertToDetailVO(Article article) {
        ArticleDetailVO vo = new ArticleDetailVO();
        vo.setId(article.getId());
        vo.setTitle(article.getTitle());
        vo.setContent(article.getContent());
        vo.setSummary(article.getSummary());
        vo.setCoverImage(article.getCoverImage());
        vo.setAuthorId(article.getAuthorId());
        vo.setViewCount(article.getViewCount());
        vo.setLikeCount(article.getLikeCount());
        vo.setCommentCount(article.getCommentCount());
        vo.setFavoriteCount(article.getFavoriteCount());
        vo.setIsTop(article.getIsTop());
        vo.setIsRecommend(article.getIsRecommend());
        vo.setCreateTime(article.getCreateTime());
        vo.setUpdateTime(article.getUpdateTime());

        vo.setCategories(getArticleCategories(article.getId()));
        vo.setTags(getArticleTags(article.getId()));

        return vo;
    }

    private List<CategoryVO> getArticleCategories(Long articleId) {
        LambdaQueryWrapper<ArticleCategory> acWrapper = new LambdaQueryWrapper<>();
        acWrapper.eq(ArticleCategory::getArticleId, articleId);
        List<ArticleCategory> acList = articleCategoryMapper.selectList(acWrapper);

        if (acList.isEmpty()) {
            return List.of();
        }

        List<Long> categoryIds = acList.stream()
                .map(ArticleCategory::getCategoryId)
                .collect(Collectors.toList());

        return categoryMapper.selectBatchIds(categoryIds).stream()
                .map(c -> {
                    CategoryVO vo = new CategoryVO();
                    vo.setId(c.getId());
                    vo.setName(c.getName());
                    vo.setIcon(c.getIcon());
                    vo.setSort(c.getSort());
                    return vo;
                })
                .collect(Collectors.toList());
    }

    private List<TagVO> getArticleTags(Long articleId) {
        LambdaQueryWrapper<ArticleTag> atWrapper = new LambdaQueryWrapper<>();
        atWrapper.eq(ArticleTag::getArticleId, articleId);
        List<ArticleTag> atList = articleTagMapper.selectList(atWrapper);

        if (atList.isEmpty()) {
            return List.of();
        }

        List<Long> tagIds = atList.stream()
                .map(ArticleTag::getTagId)
                .collect(Collectors.toList());

        return tagMapper.selectBatchIds(tagIds).stream()
                .map(t -> {
                    TagVO vo = new TagVO();
                    vo.setId(t.getId());
                    vo.setName(t.getName());
                    vo.setColor(t.getColor());
                    return vo;
                })
                .collect(Collectors.toList());
    }

    private void saveArticleRelations(Long articleId, List<Long> categoryIds, List<Long> tagIds) {
        if (categoryIds != null && !categoryIds.isEmpty()) {
            for (Long categoryId : categoryIds) {
                ArticleCategory ac = ArticleCategory.builder()
                        .articleId(articleId)
                        .categoryId(categoryId)
                        .build();
                articleCategoryMapper.insert(ac);
            }
        }

        if (tagIds != null && !tagIds.isEmpty()) {
            for (Long tagId : tagIds) {
                ArticleTag at = ArticleTag.builder()
                        .articleId(articleId)
                        .tagId(tagId)
                        .build();
                articleTagMapper.insert(at);
            }
        }
    }

    private void deleteArticleRelations(Long articleId) {
        LambdaQueryWrapper<ArticleCategory> acWrapper = new LambdaQueryWrapper<>();
        acWrapper.eq(ArticleCategory::getArticleId, articleId);
        articleCategoryMapper.delete(acWrapper);

        LambdaQueryWrapper<ArticleTag> atWrapper = new LambdaQueryWrapper<>();
        atWrapper.eq(ArticleTag::getArticleId, articleId);
        articleTagMapper.delete(atWrapper);
    }
}
