package com.aurora.controller;

import cn.dev33.satoken.annotation.SaCheckLogin;
import com.aurora.common.Result;
import com.aurora.dto.article.CommentSaveDTO;
import com.aurora.service.CommentService;
import com.aurora.vo.article.CommentVO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *   评论 Controller
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
@RestController
@RequestMapping("/api/comment")
@RequiredArgsConstructor
@Tag(name = "评论接口", description = "评论相关操作")
public class CommentController {

    private final CommentService commentService;

    @GetMapping("/article/{articleId}")
    @Operation(summary = "获取文章评论")
    public Result<List<CommentVO>> list(@PathVariable Long articleId) {
        return Result.success(commentService.getArticleComments(articleId));
    }

    @PostMapping
    @SaCheckLogin
    @Operation(summary = "发表评论")
    public Result<Long> save(@RequestBody @Validated CommentSaveDTO saveDTO) {
        return Result.success(commentService.saveComment(saveDTO));
    }

    @DeleteMapping("/{id}")
    @SaCheckLogin
    @Operation(summary = "删除评论")
    public Result<Void> delete(@PathVariable Long id) {
        commentService.deleteComment(id);
        return Result.success();
    }
}
