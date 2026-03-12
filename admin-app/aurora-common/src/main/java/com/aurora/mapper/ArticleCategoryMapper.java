package com.aurora.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.aurora.entity.ArticleCategory;
import org.apache.ibatis.annotations.Mapper;

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *   文章-分类关联 Mapper 接口
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
@Mapper
public interface ArticleCategoryMapper extends BaseMapper<ArticleCategory> {
}
