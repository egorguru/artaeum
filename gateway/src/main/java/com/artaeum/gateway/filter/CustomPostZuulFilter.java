package com.artaeum.gateway.filter;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;
import org.apache.commons.io.IOUtils;
import org.springframework.stereotype.Component;

import javax.servlet.http.Cookie;
import java.io.IOException;
import java.io.InputStream;
import java.util.Map;

@Component
public class CustomPostZuulFilter extends ZuulFilter {

    private final ObjectMapper mapper = new ObjectMapper();

    @Override
    public Object run() {
        RequestContext ctx = RequestContext.getCurrentContext();
        String requestURI = ctx.getRequest().getRequestURI();
        String requestMethod = ctx.getRequest().getMethod();
        try {
            InputStream is = ctx.getResponseDataStream();
            String responseBody = IOUtils.toString(is, "UTF-8");
            if (responseBody.contains("refresh_token")) {
                Map<String, Object> responseMap =
                        this.mapper.readValue(responseBody, new TypeReference<Map<String, Object>>() {});
                String refreshToken = responseMap.get("refresh_token").toString();
                responseMap.remove("refresh_token");
                responseBody = this.mapper.writeValueAsString(responseMap);
                Cookie cookie = new Cookie("refreshToken", refreshToken);
                cookie.setHttpOnly(true);
                cookie.setSecure(true);
                cookie.setPath(ctx.getRequest().getContextPath() + "/oauth/token");
                cookie.setMaxAge(2592000); // 30 days
                ctx.getResponse().addCookie(cookie);
            }
            if (requestURI.contains("oauth/token") && requestMethod.equals("DELETE")) {
                Cookie cookie = new Cookie("refreshToken", "");
                cookie.setMaxAge(0);
                cookie.setPath(ctx.getRequest().getContextPath() + "/uaa/oauth/token");
                ctx.getResponse().addCookie(cookie);
            }
            ctx.setResponseBody(responseBody);
        } catch (IOException e) {
            System.out.println(e.getMessage());
        }
        return null;
    }

    @Override
    public boolean shouldFilter() {
        return true;
    }

    @Override
    public int filterOrder() {
        return 10;
    }

    @Override
    public String filterType() {
        return "post";
    }
}
