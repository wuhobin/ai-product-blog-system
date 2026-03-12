package com.aurora.dto.article;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.List;

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *   文章保存 DTO
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
@Data
@Schema(description = "文章保存请求")
public class ArticleSaveDTO {

    @Schema(description = "文章标题")
    @NotBlank(message = "文章标题不能为空")
    @Size(max = 200, message = "标题最多200字")
    private String title;

    @Schema(description = "文章内容(Markdown)")
    @NotBlank(message = "文章内容不能为空")
    private String content;

    @Schema(description = "文章摘要")
    @Size(max = 500, message = "摘要最多500字")
    private String summary;

    @Schema(description = "封面图URL")
    private String coverImage;

    @Schema(description = "分类ID列表")
    private List<Long> categoryIds;

    @Schema(description = "标签ID列表")
    private List<Long> tagIds;

    @Schema(description = "状态: 0草稿 1已发布")
    private Integer status;
}
