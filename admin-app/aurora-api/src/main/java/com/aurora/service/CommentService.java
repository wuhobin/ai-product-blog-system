package com.aurora.service;

import com.aurora.dto.article.CommentSaveDTO;
import com.aurora.vo.article.CommentVO;

import java.util.List;

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *   评论 Service 接口
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
public interface CommentService {

    /**
     * 获取文章评论列表(树形结构)
     */
    List<CommentVO> getArticleComments(Long articleId);

    /**
     * 发表评论
     */
    Long saveComment(CommentSaveDTO saveDTO);

    /**
     * 删除评论
     */
    void deleteComment(Long id);
}
