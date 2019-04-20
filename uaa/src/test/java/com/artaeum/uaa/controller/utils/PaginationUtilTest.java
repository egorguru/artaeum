package com.artaeum.uaa.controller.utils;

import org.junit.Test;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpHeaders;

import java.util.ArrayList;
import java.util.List;

import static org.junit.Assert.assertEquals;

public class PaginationUtilTest {

    @Test
    public void generatePaginationHttpHeadersTest() {
        Page<String> page = new PageImpl<>(new ArrayList<>(), PageRequest.of(6, 50), 400L);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page);
        List<String> xTotalCountHeaders = headers.get("X-Total-Count");
        assertEquals(1, xTotalCountHeaders.size());
        assertEquals(400L, Long.valueOf(xTotalCountHeaders.get(0)).longValue());
    }
}
