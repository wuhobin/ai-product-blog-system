package com.aurora.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.aurora.entity.Article;
import com.aurora.entity.ArticleTag;
import com.aurora.entity.Tag;
import com.aurora.mapper.ArticleMapper;
import com.aurora.mapper.ArticleTagMapper;
import com.aurora.mapper.TagMapper;
import com.aurora.service.TagService;
import com.aurora.vo.article.ArticleListVO;
import com.aurora.vo.article.TagVO;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *   标签 Service 实现类
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
@Service
@RequiredArgsConstructor
public class TagServiceImpl implements TagService {

    private final TagMapper tagMapper;
    private final ArticleTagMapper articleTagMapper;
    private final ArticleMapper articleMapper;

    @Override
    public List<TagVO> listTags() {
        return tagMapper.selectList(null).stream()
                .map(this::convertToVO)
                .collect(Collectors.toList());
    }

    @Override
    public List<ArticleListVO> getTagArticles(Long tagId) {
        LambdaQueryWrapper<ArticleTag> atWrapper = new LambdaQueryWrapper<>();
        atWrapper.eq(ArticleTag::getTagId, tagId);
        List<ArticleTag> atList = articleTagMapper.selectList(atWrapper);

        if (atList.isEmpty()) {
            return List.of();
        }

        List<Long> articleIds = atList.stream()
                .map(ArticleTag::getArticleId)
                .collect(Collectors.toList());

        LambdaQueryWrapper<Article> articleWrapper = new LambdaQueryWrapper<>();
        articleWrapper.in(Article::getId, articleIds)
                .eq(Article::getStatus, 1)
                .orderByDesc(Article::getCreateTime);

        return articleMapper.selectList(articleWrapper).stream()
                .map(this::convertToListVO)
                .collect(Collectors.toList());
    }

    private TagVO convertToVO(Tag tag) {
        TagVO vo = new TagVO();
        vo.setId(tag.getId());
        vo.setName(tag.getName());
        vo.setColor(tag.getColor());

        LambdaQueryWrapper<ArticleTag> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(ArticleTag::getTagId, tag.getId());
        Long count = articleTagMapper.selectCount(wrapper);
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
