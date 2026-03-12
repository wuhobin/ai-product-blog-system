package com.aurora.controller;

import cn.dev33.satoken.annotation.SaCheckLogin;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.aurora.common.Result;
import com.aurora.dto.article.ArticleQueryDTO;
import com.aurora.dto.article.ArticleSaveDTO;
import com.aurora.service.ArticleService;
import com.aurora.vo.article.ArticleDetailVO;
import com.aurora.vo.article.ArticleListVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *   文章 Controller
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
@RestController
@RequestMapping("/api/article")
@RequiredArgsConstructor
@Tag(name = "文章接口", description = "文章相关操作")
public class ArticleController {

    private final ArticleService articleService;

    @GetMapping
    @Operation(summary = "文章列表")
    public Result<IPage<ArticleListVO>> list(ArticleQueryDTO queryDTO) {
        return Result.success(articleService.listArticles(queryDTO));
    }

    @GetMapping("/{id}")
    @Operation(summary = "文章详情")
    public Result<ArticleDetailVO> detail(@PathVariable Long id) {
        return Result.success(articleService.getArticleDetail(id));
    }

    @GetMapping("/hot")
    @Operation(summary = "热门文章")
    public Result<IPage<ArticleListVO>> hot(
            @RequestParam(defaultValue = "1") Integer pageNum,
            @RequestParam(defaultValue = "10") Integer pageSize) {
        return Result.success(articleService.listHotArticles(pageNum, pageSize));
    }

    @GetMapping("/recommend")
    @Operation(summary = "推荐文章")
    public Result<IPage<ArticleListVO>> recommend(
            @RequestParam(defaultValue = "1") Integer pageNum,
            @RequestParam(defaultValue = "10") Integer pageSize) {
        return Result.success(articleService.listRecommendArticles(pageNum, pageSize));
    }

    @GetMapping("/user/{userId}")
    @Operation(summary = "用户文章列表")
    public Result<IPage<ArticleListVO>> userArticles(
            @PathVariable Long userId,
            @RequestParam(defaultValue = "1") Integer pageNum,
            @RequestParam(defaultValue = "10") Integer pageSize) {
        return Result.success(articleService.listUserArticles(userId, pageNum, pageSize));
    }

    @PostMapping
    @SaCheckLogin
    @Operation(summary = "创建文章")
    public Result<Long> save(@RequestBody @Validated ArticleSaveDTO saveDTO) {
        return Result.success(articleService.saveArticle(saveDTO));
    }

    @PutMapping("/{id}")
    @SaCheckLogin
    @Operation(summary = "更新文章")
    public Result<Void> update(@PathVariable Long id, @RequestBody @Validated ArticleSaveDTO saveDTO) {
        articleService.updateArticle(id, saveDTO);
        return Result.success();
    }

    @DeleteMapping("/{id}")
    @SaCheckLogin
    @Operation(summary = "删除文章")
    public Result<Void> delete(@PathVariable Long id) {
        articleService.deleteArticle(id);
        return Result.success();
    }

    @PostMapping("/{id}/like")
    @SaCheckLogin
    @Operation(summary = "点赞文章")
    public Result<Void> like(@PathVariable Long id) {
        articleService.likeArticle(id);
        return Result.success();
    }

    @DeleteMapping("/{id}/like")
    @SaCheckLogin
    @Operation(summary = "取消点赞")
    public Result<Void> unlike(@PathVariable Long id) {
        articleService.unlikeArticle(id);
        return Result.success();
    }

    @PostMapping("/{id}/favorite")
    @SaCheckLogin
    @Operation(summary = "收藏文章")
    public Result<Void> favorite(@PathVariable Long id) {
        articleService.favoriteArticle(id);
        return Result.success();
    }

    @DeleteMapping("/{id}/favorite")
    @SaCheckLogin
    @Operation(summary = "取消收藏")
    public Result<Void> unfavorite(@PathVariable Long id) {
        articleService.unfavoriteArticle(id);
        return Result.success();
    }
}
