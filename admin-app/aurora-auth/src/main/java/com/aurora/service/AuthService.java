package com.aurora.service;


import com.aurora.dto.LoginDTO;
import com.aurora.dto.user.LoginUserInfo;

public interface AuthService {

    /**
     * 用户登录
     */
    LoginUserInfo login(LoginDTO loginDTO);

    /**
     * 获取当前登录用户信息
     */
    LoginUserInfo getLoginUserInfo();


}
