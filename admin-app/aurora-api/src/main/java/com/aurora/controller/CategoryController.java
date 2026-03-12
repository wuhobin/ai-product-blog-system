package com.aurora.controller;

import com.aurora.common.Result;
import com.aurora.service.CategoryService;
import com.aurora.vo.article.ArticleListVO;
import com.aurora.vo.article.CategoryVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *   分类 Controller
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
@RestController
@RequestMapping("/api/category")
@RequiredArgsConstructor
@Tag(name = "分类接口", description = "分类相关操作")
public class CategoryController {

    private final CategoryService categoryService;

    @GetMapping
    @Operation(summary = "分类列表")
    public Result<List<CategoryVO>> list() {
        return Result.success(categoryService.listCategories());
    }

    @GetMapping("/{id}/articles")
    @Operation(summary = "分类下文章")
    public Result<List<ArticleListVO>> articles(@PathVariable Long id) {
        return Result.success(categoryService.getCategoryArticles(id));
    }
}
