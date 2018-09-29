package com.artaeum.uaa.controller.utils;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.web.util.UriComponentsBuilder;

public final class PaginationUtil {

    private PaginationUtil() {}

    public static HttpHeaders generatePaginationHttpHeaders(Page<?> page, String baseUrl) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("X-Total-Count", Long.toString(page.getTotalElements()));
        StringBuilder result = new StringBuilder();
        if ((page.getNumber() + 1) < page.getTotalPages()) {
            result.append("<").append(generateUri(baseUrl, page.getNumber() + 1, page.getSize())).append(">; rel=\"next\",");
        }
        if ((page.getNumber()) > 0) {
            result.append("<").append(generateUri(baseUrl, page.getNumber() - 1, page.getSize())).append(">; rel=\"prev\",");
        }
        int lastPage = 0;
        if (page.getTotalPages() > 0) {
            lastPage = page.getTotalPages() - 1;
        }
        result.append("<").append(generateUri(baseUrl, lastPage, page.getSize())).append(">; rel=\"last\",");
        result.append("<").append(generateUri(baseUrl, 0, page.getSize())).append(">; rel=\"first\"");
        headers.add(HttpHeaders.LINK, result.toString());
        return headers;
    }

    private static String generateUri(String baseUrl, int page, int size) {
        return UriComponentsBuilder
                .fromUriString(baseUrl)
                .queryParam("page", page)
                .queryParam("size", size)
                .toUriString();
    }
}
