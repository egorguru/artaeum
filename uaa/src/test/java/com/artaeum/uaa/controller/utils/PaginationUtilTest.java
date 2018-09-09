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
        String baseUrl = "/api/example";
        List<String> content = new ArrayList<>();
        Page<String> page = new PageImpl<>(content, new PageRequest(6, 50), 400L);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, baseUrl);
        List<String> strHeaders = headers.get(HttpHeaders.LINK);
        assertEquals(1, strHeaders.size());
        String headerData = strHeaders.get(0);
        assertEquals(4, headerData.split(",").length);
        String expectedData = "</api/example?page=7&size=50>; rel=\"next\","
                + "</api/example?page=5&size=50>; rel=\"prev\","
                + "</api/example?page=7&size=50>; rel=\"last\","
                + "</api/example?page=0&size=50>; rel=\"first\"";
        assertEquals(expectedData, headerData);
        List<String> xTotalCountHeaders = headers.get("X-Total-Count");
        assertEquals(1, xTotalCountHeaders.size());
        assertEquals(400L, Long.valueOf(xTotalCountHeaders.get(0)).longValue());
    }
}
