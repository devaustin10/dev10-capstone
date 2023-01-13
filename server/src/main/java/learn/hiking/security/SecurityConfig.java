package learn.safari.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;


@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http.csrf().disable();

        http.cors();

        // change ant patterns pathing once database is fully up and running
        http.authorizeRequests()
                .antMatchers(HttpMethod.GET,
                        "/order").permitAll()
                .antMatchers(HttpMethod.GET,
                        "/sighting", "/sighting/*").permitAll()
                .antMatchers(HttpMethod.POST,
                        "/sighting").hasAnyAuthority("USER", "ADMIN")
                .antMatchers(HttpMethod.PUT,
                        "/sighting/*").hasAnyAuthority("USER", "ADMIN")
                .antMatchers(HttpMethod.DELETE,
                        "/sighting/*").hasAnyAuthority("ADMIN")
                // if we get to this point, let's deny all requests
                .antMatchers("/**").denyAll()
                .and()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS);

        return http.build();
    }
}