package com.artaeum.uaa.config;

import org.apache.commons.codec.CharEncoding;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.thymeleaf.templateresolver.ClassLoaderTemplateResolver;

@Configuration
public class ThymeleafConfiguration {

    @Bean
    public ClassLoaderTemplateResolver emailTemplateResolver() {
        return new ClassLoaderTemplateResolver() {{
            setPrefix("mails/");
            setSuffix(".html");
            setTemplateMode("HTML");
            setCharacterEncoding(CharEncoding.UTF_8);
            setOrder(1);
        }};
    }
}
