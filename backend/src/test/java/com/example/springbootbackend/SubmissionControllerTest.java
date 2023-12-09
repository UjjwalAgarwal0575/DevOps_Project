package com.example.springbootbackend;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;

import com.example.springbootbackend.controllers.SubmissionController;
import com.example.springbootbackend.database.User;
import com.example.springbootbackend.database.UserRepo;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
// @WebMvcTest(SubmissionController.class)
@AutoConfigureMockMvc
public class SubmissionControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Mock
    private UserRepo userRepo;

    @InjectMocks
    private SubmissionController submissionController;

    @Test
    void saveUser() throws Exception {
        User user = new User();
        user.setId("12");
        user.setUsername("John");
        when(userRepo.save(any(User.class))).thenReturn(user);

        mockMvc.perform(MockMvcRequestBuilders.post("/api/post-data")
                .content(asJsonString(user))
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value("12"))
                .andExpect(jsonPath("$.username").value("John"));
    }

    private String asJsonString(final Object obj) {
        try {
            return new ObjectMapper().writeValueAsString(obj);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    
    @Test
	public void shouldReturnDefaultMessage() throws Exception {
        //when(service.getSubmissionsByUserID());
		// this.mockMvc.perform(get("/api/v1/hii")).andDo(print()).andExpect(status().isOk())
		// 		.andExpect(content().string(containsString("Hello, World")));
        mockMvc.perform(get("/api/"))
               .andExpect(status().isOk())
               .andExpect(content().string(containsString("Connected!")));
	}
}

