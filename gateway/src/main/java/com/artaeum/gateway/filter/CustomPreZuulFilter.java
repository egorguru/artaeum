package com.artaeum.gateway.filter;

import com.netflix.zuul.ZuulFilter;
import com.netflix.zuul.context.RequestContext;
import org.springframework.stereotype.Component;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@Component
public class CustomPreZuulFilter extends ZuulFilter {

    @Override
    public Object run() {
        RequestContext ctx = RequestContext.getCurrentContext();
        HttpServletRequest req = ctx.getRequest();
        String refreshToken = extractRefreshToken(req);
        if (refreshToken != null) {
            Map<String, String[]> param = new HashMap<>();
            param.put("refresh_token", new String[] { refreshToken });
            param.put("grant_type", new String[] { "refresh_token" });
            ctx.setRequest(new CustomHttpServletRequest(req, param));
        }
        return null;
    }

    private String extractRefreshToken(HttpServletRequest req) {
        Cookie[] cookies = req.getCookies();
        if (cookies != null) {
            for (Cookie c : cookies) {
                if (c.getName().equalsIgnoreCase("refreshToken")) {
                    return c.getValue();
                }
            }
        }
        return null;
    }

    @Override
    public boolean shouldFilter() {
        return true;
    }

    @Override
    public int filterOrder() {
        return -2;
    }

    @Override
    public String filterType() {
        return "pre";
    }
}
