package com.aurora.service.impl;


import com.aurora.config.StpUserUtil;
import com.aurora.dto.article.CommentSaveDTO;
import com.aurora.entity.Article;
import com.aurora.entity.Comment;
import com.aurora.entity.SysUser;
import com.aurora.mapper.ArticleMapper;
import com.aurora.mapper.CommentMapper;
import com.aurora.mapper.SysUserMapper;
import com.aurora.service.CommentService;
import com.aurora.vo.article.CommentVO;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *   评论 Service 实现类
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentMapper commentMapper;
    private final ArticleMapper articleMapper;
    private final SysUserMapper sysUserMapper;

    @Override
    public List<CommentVO> getArticleComments(Long articleId) {
        LambdaQueryWrapper<Comment> wrapper = new LambdaQueryWrapper<>();
        wrapper.eq(Comment::getArticleId, articleId)
                .eq(Comment::getStatus, 0)
                .orderByAsc(Comment::getCreateTime);

        List<Comment> comments = commentMapper.selectList(wrapper);

        List<Integer> userIds = comments.stream()
                .map(c -> c.getUserId() != null ? c.getUserId().intValue() : null)
                .filter(id -> id != null)
                .distinct()
                .collect(Collectors.toList());

        List<SysUser> users = sysUserMapper.selectBatchIds(userIds);
        Map<Integer, SysUser> userMap = users.stream()
                .collect(Collectors.toMap(SysUser::getId, u -> u, (v1, v2) -> v1));

        List<CommentVO> voList = comments.stream()
                .map(c -> convertToVO(c, userMap))
                .collect(Collectors.toList());

        Map<Long, List<CommentVO>> childrenMap = voList.stream()
                .filter(c -> c.getParentId() != null && c.getParentId() > 0)
                .collect(Collectors.groupingBy(CommentVO::getParentId));

        return voList.stream()
                .filter(c -> c.getParentId() == null || c.getParentId() == 0)
                .peek(c -> c.setChildren(childrenMap.get(c.getId())))
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Long saveComment(CommentSaveDTO saveDTO) {
        Long userId = StpUserUtil.getLoginIdAsLong();

        Long parentId = saveDTO.getParentId() != null ? saveDTO.getParentId() : 0L;

        Comment comment = Comment.builder()
                .articleId(saveDTO.getArticleId())
                .userId(userId)
                .parentId(parentId)
                .replyToId(saveDTO.getReplyToId())
                .replyToUserId(saveDTO.getReplyToUserId())
                .content(saveDTO.getContent())
                .likeCount(0)
                .status(0)
                .build();

        commentMapper.insert(comment);

        Article article = articleMapper.selectById(saveDTO.getArticleId());
        if (article != null) {
            article.setCommentCount(article.getCommentCount() + 1);
            articleMapper.updateById(article);
        }

        return comment.getId();
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void deleteComment(Long id) {
        Long userId = StpUserUtil.getLoginIdAsLong();

        Comment comment = commentMapper.selectById(id);
        if (comment == null || !comment.getUserId().equals(userId)) {
            throw new RuntimeException("无权限删除此评论");
        }

        comment.setStatus(1);
        commentMapper.updateById(comment);

        Article article = articleMapper.selectById(comment.getArticleId());
        if (article != null && article.getCommentCount() > 0) {
            article.setCommentCount(article.getCommentCount() - 1);
            articleMapper.updateById(article);
        }
    }

    private CommentVO convertToVO(Comment comment, Map<Integer, SysUser> userMap) {
        CommentVO vo = new CommentVO();
        vo.setId(comment.getId());
        vo.setArticleId(comment.getArticleId());
        vo.setUserId(comment.getUserId());
        vo.setParentId(comment.getParentId());
        vo.setReplyToId(comment.getReplyToId());
        vo.setContent(comment.getContent());
        vo.setLikeCount(comment.getLikeCount());
        vo.setCreateTime(comment.getCreateTime());

        SysUser user = userMap.get(comment.getUserId() != null ? comment.getUserId().intValue() : null);
        if (user != null) {
            vo.setUserName(user.getNickname());
            vo.setUserAvatar(user.getAvatar());
        }

        if (comment.getReplyToUserId() != null) {
            SysUser replyToUser = userMap.get(comment.getReplyToUserId().intValue());
            if (replyToUser != null) {
                vo.setReplyToUserName(replyToUser.getNickname());
            }
        }

        return vo;
    }
}
