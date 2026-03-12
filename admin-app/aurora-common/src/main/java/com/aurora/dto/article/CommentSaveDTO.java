package com.aurora.dto.article;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *   评论保存 DTO
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
@Data
@Schema(description = "评论保存请求")
public class CommentSaveDTO {

    @Schema(description = "文章ID")
    @NotNull(message = "文章ID不能为空")
    private Long articleId;

    @Schema(description = "父评论ID(0或不传表示一级评论)")
    private Long parentId;

    @Schema(description = "回复的评论ID")
    private Long replyToId;

    @Schema(description = "回复的用户ID")
    private Long replyToUserId;

    @Schema(description = "评论内容")
    @NotBlank(message = "评论内容不能为空")
    @Size(max = 1000, message = "评论最多1000字")
    private String content;
}
