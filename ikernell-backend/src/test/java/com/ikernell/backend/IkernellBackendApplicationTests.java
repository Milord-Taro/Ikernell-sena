package com.ikernell.backend;

import org.junit.jupiter.api.Tag;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

/**
 * Test de integración: levanta el contexto Spring completo, lo que ejecuta
 * Flyway contra una base PostgreSQL REAL (perfil dev por defecto). Por eso
 * está etiquetado como "integration" y NO corre con `mvn test` en una máquina
 * sin base de datos -- así la suite unitaria (Mockito puro) queda verde en
 * cualquier clon/CI. Para correrlo donde SÍ hay base:
 *   ./mvnw test -Dtest.excluded.groups=
 * (ver la property test.excluded.groups en el pom.xml).
 */
@Tag("integration")
@SpringBootTest
class IkernellBackendApplicationTests {

	@Test
	void contextLoads() {
	}

}
