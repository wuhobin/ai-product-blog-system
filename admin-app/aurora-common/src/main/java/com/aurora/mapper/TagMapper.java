package com.aurora.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.aurora.entity.Tag;
import org.apache.ibatis.annotations.Mapper;

/**
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 *   标签 Mapper 接口
 * ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 */
@Mapper
public interface TagMapper extends BaseMapper<Tag> {
}
