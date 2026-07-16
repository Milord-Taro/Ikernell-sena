package com.ikernell.backend.config;

import org.flywaydb.core.Flyway;
import org.springframework.boot.context.event.ApplicationEnvironmentPreparedEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.core.env.ConfigurableEnvironment;

/**
 * CORREGIDO (A2): esta versión de Spring Boot (4.1.0, ver pom.xml) no
 * incluye auto-configuración de Flyway -- se verificó directamente que
 * spring-boot-autoconfigure no trae ninguna clase de Flyway. Agregar
 * flyway-core al classpath, por sí solo, no hace nada: hay que invocarlo
 * a mano.
 *
 * El primer intento (un @Bean Flyway + un BeanFactoryPostProcessor
 * forzando dependsOn sobre el EntityManagerFactory, imitando lo que Boot
 * hace internamente en versiones donde sí trae la auto-configuración)
 * resultó fràgil: con allowEagerInit=false el postprocessor no
 * encontraba el bean (lista vacía, silencioso) y con allowEagerInit=true
 * forzaba una instanciación prematura de HibernateJpaConfiguration que
 * rompía el arranque (NoSuchMethodException: sin constructor por
 * defecto). Cualquiera de las dos formas depende de detalles internos
 * del ciclo de vida de beans de Spring que claramente cambiaron en esta
 * versión.
 *
 * Este enfoque es más simple y no depende de esos detalles: Flyway corre
 * como ApplicationListener sobre ApplicationEnvironmentPreparedEvent, que
 * Spring Boot dispara DESPUÉS de resolver el Environment completo
 * (properties de cada perfil + application-local.properties) pero ANTES
 * de crear el ApplicationContext -- es decir, antes de que exista
 * cualquier bean, Hibernate incluido. El orden queda garantizado por la
 * secuencia del propio arranque de Spring Boot, no por trucos de
 * dependencias entre beans.
 *
 * Registrado en META-INF/spring.factories (no a mano en
 * IkernellBackendApplication.main()) para que se aplique a CUALQUIER
 * SpringApplication que arranque el contexto -- incluidos los tests
 * @SpringBootTest, no solo la app real. Un listener agregado solo en
 * main() no corre en los tests, y un test contra una base vacía habría
 * fallado ahí sin que Flyway alcanzara a crear las tablas.
 */
public class FlywayMigrationListener implements ApplicationListener<ApplicationEnvironmentPreparedEvent> {

    @Override
    public void onApplicationEvent(ApplicationEnvironmentPreparedEvent event) {
        ConfigurableEnvironment environment = event.getEnvironment();

        String url = environment.getRequiredProperty("spring.datasource.url");
        String username = environment.getRequiredProperty("spring.datasource.username");
        String password = environment.getRequiredProperty("spring.datasource.password");
        boolean baselineOnMigrate = environment.getProperty("spring.flyway.baseline-on-migrate", Boolean.class, false);
        String baselineVersion = environment.getProperty("spring.flyway.baseline-version", "1");

        Flyway.configure()
                .dataSource(url, username, password)
                .baselineOnMigrate(baselineOnMigrate)
                .baselineVersion(baselineVersion)
                .load()
                .migrate();
    }
}
