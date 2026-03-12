package com.aurora.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.aurora.dto.article.ArticleQueryDTO;
import com.aurora.dto.article.ArticleSaveDTO;
import com.aurora.vo.article.ArticleDetailVO;
import com.aurora.vo.article.ArticleListVO;

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *   文章 Service 接口
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
public interface ArticleService {

    /**
     * 分页查询文章列表
     */
    IPage<ArticleListVO> listArticles(ArticleQueryDTO queryDTO);

    /**
     * 获取文章详情
     */
    ArticleDetailVO getArticleDetail(Long id);

    /**
     * 创建文章
     */
    Long saveArticle(ArticleSaveDTO saveDTO);

    /**
     * 更新文章
     */
    void updateArticle(Long id, ArticleSaveDTO saveDTO);

    /**
     * 删除文章
     */
    void deleteArticle(Long id);

    /**
     * 点赞文章
     */
    void likeArticle(Long articleId);

    /**
     * 取消点赞
     */
    void unlikeArticle(Long articleId);

    /**
     * 收藏文章
     */
    void favoriteArticle(Long articleId);

    /**
     * 取消收藏
     */
    void unfavoriteArticle(Long articleId);

    /**
     * 获取用户文章列表
     */
    IPage<ArticleListVO> listUserArticles(Long userId, Integer pageNum, Integer pageSize);

    /**
     * 获取热门文章
     */
    IPage<ArticleListVO> listHotArticles(Integer pageNum, Integer pageSize);

    /**
     * 获取推荐文章
     */
    IPage<ArticleListVO> listRecommendArticles(Integer pageNum, Integer pageSize);
}
