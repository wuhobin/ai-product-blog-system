package com.mojian.controller;

import cn.dev33.satoken.stp.StpUtil;
import com.mojian.common.Result;
import com.mojian.dto.LoginDTO;
import com.mojian.service.AuthService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;
import com.mojian.dto.user.*;


@RestController
@RequiredArgsConstructor
@Tag(name = "认证管理", description = "认证相关接口")
public class AuthController {

    private final AuthService authService;

    @Operation(summary = "用户登录")
    @PostMapping("/auth/login")
    public Result<LoginUserInfo> login(@RequestBody LoginDTO loginDTO) {
        return Result.success(authService.login(loginDTO));
    }

    @Operation(summary = "用户登出")
    @PostMapping("/auth/logout")
    public Result<Void> logout() {
        StpUtil.logout();
        return Result.success(null);
    }

    @GetMapping("/auth/info")
    public Result<LoginUserInfo> getUserInfo() {
        return Result.success(authService.getLoginUserInfo());
    }

}
