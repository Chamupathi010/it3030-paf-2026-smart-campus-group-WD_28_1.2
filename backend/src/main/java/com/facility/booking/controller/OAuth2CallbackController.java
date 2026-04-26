package com.facility.booking.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/oauth2")
@RequiredArgsConstructor
public class OAuth2CallbackController {

    @Value("${app.frontend.url}")
    private String frontendUrl;

    @GetMapping("/callback")
        public ResponseEntity<String> redirectToFrontend(HttpServletRequest request) {
        String queryString = request.getQueryString();
        String redirectUrl = frontendUrl + "/oauth2/callback" + (queryString != null ? "?" + queryString : "");

                String html = """
                                <!doctype html>
                                <html lang="en">
                                <head>
                                    <meta charset="UTF-8" />
                                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                                    <title>Signing in...</title>
                                </head>
                                <body>
                                    <script>
                                        (function () {
                                            var redirectUrl = '%s';

                                            try {
                                                if (window.opener && !window.opener.closed) {
                                                    window.opener.location.href = redirectUrl;
                                                    window.close();
                                                    return;
                                                }
                                            } catch (e) {
                                                // Ignore opener access issues and fall back.
                                            }

                                            try {
                                                if (window.top && window.top !== window.self) {
                                                    window.top.location.href = redirectUrl;
                                                    return;
                                                }
                                            } catch (e) {
                                                // Ignore frame access issues and fall back.
                                            }

                                            window.location.replace(redirectUrl);
                                        })();
                                    </script>
                                </body>
                                </html>
                                """.formatted(escapeForJavaScript(redirectUrl));

                return ResponseEntity.status(HttpStatus.OK)
                                .header(HttpHeaders.CACHE_CONTROL, "no-store, no-cache, must-revalidate, max-age=0")
                                .header(HttpHeaders.PRAGMA, "no-cache")
                                .contentType(MediaType.TEXT_HTML)
                                .body(html);
        }

        private String escapeForJavaScript(String value) {
                return value
                                .replace("\\", "\\\\")
                                .replace("'", "\\'")
                                .replace("\n", "")
                                .replace("\r", "");
        }
}