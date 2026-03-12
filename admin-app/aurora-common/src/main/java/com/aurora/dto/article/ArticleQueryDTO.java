package com.aurora.dto.article;

import com.aurora.common.PageQuery;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import lombok.EqualsAndHashCode;

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *   文章查询 DTO
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Schema(description = "文章查询请求")
public class ArticleQueryDTO extends PageQuery {

    @Schema(description = "文章标题")
    private String title;

    @Schema(description = "作者ID")
    private Long authorId;

    @Schema(description = "分类ID")
    private Long categoryId;

    @Schema(description = "标签ID")
    private Long tagId;

    @Schema(description = "状态: 0草稿 1已发布 2已下架")
    private Integer status;

    @Schema(description = "是否置顶")
    private Integer isTop;

    @Schema(description = "是否推荐")
    private Integer isRecommend;
}
