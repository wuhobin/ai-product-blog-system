package com.aurora.service.impl;

import cn.dev33.satoken.secure.BCrypt;
import cn.dev33.satoken.stp.StpUtil;
import com.aurora.common.Constants;
import com.aurora.common.ResultCode;
import com.aurora.dto.LoginDTO;
import com.aurora.dto.user.LoginUserInfo;
import com.aurora.service.AuthService;
import com.aurora.entity.SysUser;
import com.aurora.enums.MenuTypeEnum;
import com.aurora.exception.BusinessException;
import com.aurora.mapper.SysMenuMapper;
import com.aurora.mapper.SysRoleMapper;
import com.aurora.mapper.SysUserMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;
import java.util.*;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {


    private final SysUserMapper userMapper;

    private final SysRoleMapper roleMapper;

    private final SysMenuMapper menuMapper;


    @Override
    public LoginUserInfo login(LoginDTO loginDTO) {
        // 查询用户
        SysUser user = userMapper.selectByUsername(loginDTO.getUsername());

        //校验是否能够登录
        validateLogin(loginDTO, user);

        // 执行登录
        StpUtil.login(user.getId());
        String tokenValue = StpUtil.getTokenValue();

        // 返回用户信息
        LoginUserInfo loginUserInfo = new LoginUserInfo();
        BeanUtils.copyProperties(user, loginUserInfo);
        loginUserInfo.setToken(tokenValue);

        StpUtil.getSession().set(Constants.CURRENT_USER, loginUserInfo);
        return loginUserInfo;
    }

    @Override
    public LoginUserInfo getLoginUserInfo() {
        // 获取当前登录用户ID
        Integer userId = StpUtil.getLoginIdAsInt();
        SysUser user = userMapper.selectById(userId);
        if (user == null) {
            throw new BusinessException(ResultCode.ERROR_USER_NOT_EXIST.desc);
        }

        //获取菜单权限列表
        List<String> permissions;
        List<String> roles = roleMapper.selectRolesCodeByUserId(userId);
        if (roles.contains(Constants.ADMIN)) {
            permissions = menuMapper.getPermissionList(MenuTypeEnum.BUTTON.getCode());
        } else {
            permissions = menuMapper.getPermissionListByUserId(userId, MenuTypeEnum.BUTTON.getCode());
        }

        LoginUserInfo loginUserInfo = new LoginUserInfo();
        BeanUtils.copyProperties(user, loginUserInfo);

        loginUserInfo.setRoles(roles);
        loginUserInfo.setPermissions(permissions);
        return loginUserInfo;
    }

    private static void validateLogin(LoginDTO loginDTO, SysUser user) {
        if (user == null) {
            throw new BusinessException(ResultCode.ERROR_USER_NOT_EXIST.desc);
        }

        // 验证密码
        if (!BCrypt.checkpw(loginDTO.getPassword(), user.getPassword())) {
            throw new BusinessException(ResultCode.ERROR_PASSWORD.desc);
        }

        // 验证状态
        if (user.getStatus() != 1) {
            throw new BusinessException(ResultCode.DISABLE_ACCOUNT.desc);
        }
    }

}
