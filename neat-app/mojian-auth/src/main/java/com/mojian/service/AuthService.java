package com.mojian.service;


import com.mojian.dto.LoginDTO;
import com.mojian.dto.user.LoginUserInfo;

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
