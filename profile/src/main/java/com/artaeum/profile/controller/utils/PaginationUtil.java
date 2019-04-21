package com.artaeum.profile.controller.utils;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;

public final class PaginationUtil {

    private PaginationUtil() {}

    public static HttpHeaders generatePaginationHttpHeaders(Page<?> page) {
        return new HttpHeaders() {{
            add("X-Total-Count", Long.toString(page.getTotalElements()));
        }};
    }
}
