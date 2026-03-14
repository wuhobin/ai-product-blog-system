package com.aurora.config;

import cn.dev33.satoken.session.SaSession;
import cn.dev33.satoken.stp.StpLogic;

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *   前台用户认证工具类（Kit 模式）
 *   独立于后台 StpUtil，token 存储完全隔离
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
public class StpUserUtil {

    private StpUserUtil() {}

    /**
     * 账号体系标识
     */
    public static final String TYPE = "user";

    /**
     * 底层的 StpLogic 对象
     * 重写 TokenName，防止与后台 token 冲突
     */
    public static StpLogic stpLogic = new StpLogic(TYPE) {
        @Override
        public String splicingKeyTokenName() {
            return super.splicingKeyTokenName() + "-user";
        }
    };

    // ========== 基础方法 ==========

    public static String getLoginType() {
        return stpLogic.getLoginType();
    }

    public static void login(Object id) {
        stpLogic.login(id);
    }

    public static void logout() {
        stpLogic.logout();
    }

    public static boolean isLogin() {
        return stpLogic.isLogin();
    }

    public static Object getLoginId() {
        return stpLogic.getLoginId();
    }

    public static Integer getLoginIdAsInt() {
        return stpLogic.getLoginIdAsInt();
    }

    public static String getTokenValue() {
        return stpLogic.getTokenValue();
    }

    public static void checkLogin() {
        stpLogic.checkLogin();
    }

    public static SaSession getSession() {
        return stpLogic.getSession();
    }

    public static Long getLoginIdAsLong() {
        return stpLogic.getLoginIdAsLong();
    }
}
