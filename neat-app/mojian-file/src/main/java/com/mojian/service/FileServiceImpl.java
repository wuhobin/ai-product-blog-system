package com.mojian.service;

import com.mojian.exception.BusinessException;
import com.mojian.utils.DateUtils;
import lombok.RequiredArgsConstructor;
import org.dromara.x.file.storage.core.FileInfo;
import org.dromara.x.file.storage.core.FileStorageService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
public class FileServiceImpl implements FileService{

    private final FileStorageService fileStorageService;

    @Override
    public String upload(MultipartFile file) {

        //获取文件名和后缀
        String fileName = file.getOriginalFilename();
        FileInfo fileInfo = fileStorageService.of(file)
                .setPath(DateUtils.parseDateToStr(DateUtils.YYYYMMDD, DateUtils.getNowDate()) + "/")
                .setSaveFilename(fileName)
                .upload();

        if (fileInfo == null) {
            throw new BusinessException("上传文件失败");
        }
        return fileInfo.getUrl();
    }

    @Override
    public Boolean delete(String url) {
        return fileStorageService.delete(url);
    }
}
