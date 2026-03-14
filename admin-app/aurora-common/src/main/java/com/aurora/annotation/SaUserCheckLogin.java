package com.aurora.annotation;

import cn.dev33.satoken.annotation.SaCheckLogin;
import com.aurora.config.StpUserUtil;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *   前台用户登录校验注解
 *   效果等同于 @SaCheckLogin(type = "user")
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
@SaCheckLogin(type = StpUserUtil.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Target({ ElementType.METHOD, ElementType.TYPE})
public @interface SaUserCheckLogin {

}