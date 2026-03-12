package com.aurora.service;

import com.aurora.vo.article.ArticleListVO;
import com.aurora.vo.article.TagVO;

import java.util.List;

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *   标签 Service 接口
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
public interface TagService {

    /**
     * 获取标签列表
     */
    List<TagVO> listTags();

    /**
     * 获取标签下的文章
     */
    List<ArticleListVO> getTagArticles(Long tagId);
}
