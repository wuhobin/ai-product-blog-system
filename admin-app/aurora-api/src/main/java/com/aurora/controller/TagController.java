package com.aurora.controller;

import com.aurora.common.Result;
import com.aurora.service.TagService;
import com.aurora.vo.article.ArticleListVO;
import com.aurora.vo.article.TagVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *   标签 Controller
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
@RestController
@RequestMapping("/api/tag")
@RequiredArgsConstructor
@Tag(name = "标签接口", description = "标签相关操作")
public class TagController {

    private final TagService tagService;

    @GetMapping
    @Operation(summary = "标签列表")
    public Result<List<TagVO>> list() {
        return Result.success(tagService.listTags());
    }

    @GetMapping("/{id}/articles")
    @Operation(summary = "标签下文章")
    public Result<List<ArticleListVO>> articles(@PathVariable Long id) {
        return Result.success(tagService.getTagArticles(id));
    }
}
