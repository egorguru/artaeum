package com.artaeum.uaa.service;

import com.artaeum.uaa.domain.User;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.ArgumentCaptor;
import org.mockito.Captor;
import org.mockito.Spy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.MessageSource;
import org.springframework.core.env.Environment;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.test.context.junit4.SpringRunner;
import org.thymeleaf.spring5.SpringTemplateEngine;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.IOException;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;
import static org.mockito.Matchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;
import static org.mockito.MockitoAnnotations.initMocks;

@RunWith(SpringRunner.class)
@SpringBootTest
public class MailServiceTest {

    @Autowired
    private Environment env;

    @Autowired
    private MessageSource messageSource;

    @Autowired
    private SpringTemplateEngine templateEngine;

    @Spy
    private JavaMailSenderImpl javaMailSender;

    @Captor
    private ArgumentCaptor<?> messageCaptor;

    private MailService mailService;

    @Before
    public void init() {
        initMocks(this);
        doNothing().when(this.javaMailSender).send(any(MimeMessage.class));
        this.mailService = new MailService(this.env, this.javaMailSender, this.messageSource, this.templateEngine);
    }

    @Test
    public void whenSendActivationEmail() throws MessagingException, IOException {
        User user = new User();
        user.setLogin("testlogin");
        user.setEmail("test@email.com");
        user.setLangKey("en");
        this.mailService.sendActivationEmail(user);
        verify(javaMailSender).send((MimeMessage) messageCaptor.capture());
        MimeMessage message = (MimeMessage) messageCaptor.getValue();
        assertEquals(message.getAllRecipients()[0].toString(), user.getEmail());
        assertEquals(message.getFrom()[0].toString(), "localhost@localhost");
        assertEquals(message.getDataHandler().getContentType(), "text/html;charset=UTF-8");
        assertTrue(!message.getContent().toString().isEmpty());
    }

    @Test
    public void whenSendCreationEmail() throws MessagingException, IOException {
        User user = new User();
        user.setLogin("testlogin");
        user.setEmail("test@email.com");
        user.setLangKey("en");
        this.mailService.sendCreationEmail(user);
        verify(javaMailSender).send((MimeMessage) messageCaptor.capture());
        MimeMessage message = (MimeMessage) messageCaptor.getValue();
        assertEquals(message.getAllRecipients()[0].toString(), user.getEmail());
        assertEquals(message.getFrom()[0].toString(), "localhost@localhost");
        assertEquals(message.getDataHandler().getContentType(), "text/html;charset=UTF-8");
        assertTrue(!message.getContent().toString().isEmpty());
    }

    @Test
    public void whenSendPasswordResetMailInRussian() throws MessagingException, IOException {
        User user = new User();
        user.setLogin("testlogin");
        user.setEmail("test@email.com");
        user.setLangKey("ru");
        this.mailService.sendPasswordResetMail(user);
        verify(javaMailSender).send((MimeMessage) messageCaptor.capture());
        MimeMessage message = (MimeMessage) messageCaptor.getValue();
        assertEquals(message.getAllRecipients()[0].toString(), user.getEmail());
        assertEquals(message.getFrom()[0].toString(), "localhost@localhost");
        assertEquals(message.getDataHandler().getContentType(), "text/html;charset=UTF-8");
        assertTrue(!message.getContent().toString().isEmpty());
    }
}
