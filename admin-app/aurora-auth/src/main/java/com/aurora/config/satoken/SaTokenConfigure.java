package com.aurora.config.satoken;

import cn.dev33.satoken.interceptor.SaInterceptor;
import cn.dev33.satoken.stp.StpUtil;
import cn.dev33.satoken.strategy.SaAnnotationStrategy;
import jakarta.annotation.PostConstruct;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.AnnotatedElementUtils;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *   Sa-Token 拦截器配置
 *   后台使用 StpUtil，前台使用 StpUserUtil
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
@Configuration
public class SaTokenConfigure implements WebMvcConfigurer {

    /**
     * 重写 Sa-Token 注解处理器，支持 Spring 注解合并
     * 使自定义注解 @SaUserCheckLogin 能够生效
     */
    @PostConstruct
    public void rewriteSaStrategy() {
        // 重写Sa-Token的注解处理器，增加注解合并功能
        SaAnnotationStrategy.instance.getAnnotation = AnnotatedElementUtils::getMergedAnnotation;
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // 后台管理拦截器：使用原生 StpUtil
        registry.addInterceptor(new SaInterceptor(handle -> StpUtil.checkLogin()))
                .addPathPatterns("/**")
                .excludePathPatterns(
                        "/auth/login",
                        "/swagger-ui/**",
                        "/swagger-ui.html",
                        "/webjars/**",
                        "/v3/api-docs/**",
                        "/v3/api-docs",
                        "/swagger-resources/**",
                        "/swagger-resources",
                        "/swagger-resources/configuration/ui",
                        "/swagger-resources/configuration/security",
                        "/localFile/**",
                        "/error",
                        "/doc.html",
                        "/doc.html/**",
                        "/favicon.ico",
                        "/wx/portal/**",
                        "/wx/portal",
                        "/auth/wechat/getCode",
                        "/auth/wechat/isLogin/**",
                        "/auth/user/logout",
                        "/api/**"
                );
    }
}
