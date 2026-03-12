package com.aurora.entity;

import com.baomidou.mybatisplus.annotation.*;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *   文章-标签关联实体类
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@TableName("article_tag")
@Schema(description = "文章-标签关联")
public class ArticleTag implements Serializable {

    @TableId(type = IdType.AUTO)
    @Schema(description = "主键ID")
    private Long id;

    @Schema(description = "文章ID")
    private Long articleId;

    @Schema(description = "标签ID")
    private Long tagId;
}
