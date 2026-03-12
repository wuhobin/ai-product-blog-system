package com.aurora.service;

import com.aurora.vo.article.ArticleListVO;
import com.aurora.vo.article.CategoryVO;

import java.util.List;

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *   分类 Service 接口
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
public interface CategoryService {

    /**
     * 获取分类列表
     */
    List<CategoryVO> listCategories();

    /**
     * 获取分类下的文章
     */
    List<ArticleListVO> getCategoryArticles(Long categoryId);
}
