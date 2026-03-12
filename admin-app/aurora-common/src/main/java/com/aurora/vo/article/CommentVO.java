package com.aurora.vo.article;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.aurora.utils.DateUtils;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *   评论 VO (支持楼中楼)
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
@Data
@Schema(description = "评论信息")
public class CommentVO {

    @Schema(description = "评论ID")
    private Long id;

    @Schema(description = "文章ID")
    private Long articleId;

    @Schema(description = "评论用户ID")
    private Long userId;

    @Schema(description = "评论用户昵称")
    private String userName;

    @Schema(description = "评论用户头像")
    private String userAvatar;

    @Schema(description = "父评论ID")
    private Long parentId;

    @Schema(description = "回复的评论ID")
    private Long replyToId;

    @Schema(description = "回复的用户昵称")
    private String replyToUserName;

    @Schema(description = "评论内容")
    private String content;

    @Schema(description = "点赞数")
    private Integer likeCount;

    @Schema(description = "子评论列表")
    private List<CommentVO> children;

    @Schema(description = "创建时间")
    @JsonFormat(pattern = DateUtils.YYYY_MM_DD_HH_MM_SS, timezone = "GMT+8")
    private LocalDateTime createTime;
}
