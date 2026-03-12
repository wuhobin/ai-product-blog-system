package com.aurora.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.aurora.entity.Article;
import org.apache.ibatis.annotations.Mapper;

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *   文章 Mapper 接口
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
@Mapper
public interface ArticleMapper extends BaseMapper<Article> {
}
