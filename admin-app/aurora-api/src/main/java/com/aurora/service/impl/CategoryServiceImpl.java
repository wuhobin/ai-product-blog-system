package com.aurora.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.aurora.entity.Article;
import com.aurora.entity.ArticleCategory;
import com.aurora.entity.Category;
import com.aurora.mapper.ArticleCategoryMapper;
import com.aurora.mapper.ArticleMapper;
import com.aurora.mapper.CategoryMapper;
import com.aurora.service.ArticleService;
import com.aurora.service.CategoryService;
import com.aurora.vo.article.ArticleListVO;
import com.aurora.vo.article.CategoryVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *   分类 Service 实现类
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryMapper categoryMapper;
    private final ArticleCategoryMapper articleCategoryMapper;
    private final ArticleMapper articleMapper;

    @Override
    public List<CategoryVO> listCategories() {
        LambdaQueryWrapper<Category> wrapper = new LambdaQueryWrapper<>();
        wrapper.orderByAsc(Category::getSort);

        return categoryMapper.selectList(wrapper).stream()
                .map(this::convertToVO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ArticleListVO> getCategoryArticles(Long categoryId) {
        LambdaQueryWrapper<ArticleCategory> acWrapper = new LambdaQueryWrapper<>();
        acWrapper.eq(ArticleCategory::getCategoryId, categoryId);
        List<ArticleCategory> acList = articleCategoryMapper.selectList(acWrapper);

        if (acList.isEmpty()) {
            return List.of();
        }

        List<Long> articleIds = acList.stream()
                .map(ArticleCategory::getArticleId)
                .collect(Collectors.toList());

        LambdaQueryWrapper<Article> articleWrapper = new LambdaQueryWrapper<>();
        articleWrapper.in(Article::getId, articleIds)
                .eq(Article::getStatus, 1)
                .orderByDesc(Article::getCreateTime);

        return articleMapper.selectList(articleWrapper).stream()
                .map(this::convertToListVO)
                .collect(Collectors.toList());
    }

    private CategoryVO convertToVO(Category category) {
        CategoryVO vo = new CategoryVO();
        vo.setId(category.getId());
        vo.setName(category.getName());
        vo.setIcon(category.getIcon());
        vo.setSort(category.getSort());

        LambdaQueryWrapper<ArticleCategory> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(ArticleCategory::getCategoryId, category.getId());
        Long count = articleCategoryMapper.selectCount(wrapper);
        vo.setArticleCount(count != null ? count.intValue() : 0);

        return vo;
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
        return vo;
    }
}
