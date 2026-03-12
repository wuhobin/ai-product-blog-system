package com.aurora.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.aurora.entity.ArticleFavorite;
import org.apache.ibatis.annotations.Mapper;

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *   文章收藏 Mapper 接口
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
@Mapper
public interface ArticleFavoriteMapper extends BaseMapper<ArticleFavorite> {
}
