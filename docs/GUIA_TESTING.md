# Guía de testing para IKernell (backend)

Esta guía asume que nunca has escrito un test automatizado. Si ya sabes
qué es un mock o un assert, puedes saltar directo a la sección 4.

No hiciste falta instalar nada nuevo: **JUnit 5, Mockito y AssertJ ya
vienen incluidos** en el proyecto a través de `spring-boot-starter-test`
(revisa `pom.xml`). Esta guía solo te enseña a usarlos.

---

## 1. ¿Qué es un test, y por qué molestarse?

Un test automatizado es un pedacito de código que **llama a otro
código y verifica que el resultado sea el esperado**, sin que una
persona tenga que abrir el navegador, iniciar sesión y hacer clic para
comprobarlo a mano.

Ejemplo concreto de este proyecto: la regla "un Líder de Proyecto NO
puede editar el proyecto de otro Líder" vive en
`AutorizacionProyectoService.verificarPuedeGestionar()`. Sin un test,
la única forma de confirmar que esa regla sigue funcionando después de
un cambio es: iniciar sesión como un Líder, intentar editar un
proyecto ajeno, y mirar si el sistema lo rechaza. Cada vez. A mano.
Con un test, esa misma verificación corre en milisegundos, cada vez
que alguien toca el código, para siempre.

**La pregunta que responde un test no es "¿funciona?"** (eso lo
respondes probando la app una vez). **Es "¿sigue funcionando?"**
después de que tú u otra persona cambien algo en seis meses y se les
olvide que esa regla existía.

## 2. Vocabulario mínimo

- **Test unitario**: prueba UNA pieza de lógica aislada del resto del
  sistema (por ejemplo, un método de un Service), sin tocar la base de
  datos real ni levantar el servidor. Rápido (milisegundos).
- **Test de integración**: prueba varias piezas juntas (por ejemplo,
  el Service + la base de datos real, o un endpoint HTTP completo).
  Más lento, pero detecta problemas que un test unitario no puede (ej.
  una consulta SQL mal escrita). El proyecto ya tiene uno:
  `IkernellBackendApplicationTests` (arranca todo Spring de verdad).
- **Mock**: un objeto "de mentira" que reemplaza una dependencia real
  (por ejemplo, un repositorio que normalmente hablaría con Postgres)
  para que el test unitario no necesite una base de datos. Tú le dices
  al mock qué debe devolver cuando lo llamen ("cuando te pregunten por
  el usuario con id 5, di que no existe").
- **Assertion (aserción)**: la línea que compara "lo que pasó" contra
  "lo que se esperaba", y hace fallar el test si no coinciden. En este
  proyecto se usa la librería AssertJ, que se lee casi como inglés:
  `assertThat(resultado).isEqualTo(esperado)`.
- **Given / When / Then**: la forma mental de organizar un test, aunque
  no aparezca escrita así en el código:
  - **Given** (dado): preparar los datos y los mocks.
  - **When** (cuando): llamar al método que se está probando.
  - **Then** (entonces): verificar el resultado con `assertThat`.

## 3. Qué ya existe en el proyecto

```
src/test/java/com/ikernell/backend/
├── IkernellBackendApplicationTests.java      (integración: arranca Spring completo)
└── service/
    ├── ActividadServiceTest.java             (ya existía)
    ├── ProyectoServiceTest.java               (ya existía + se le agregó un test nuevo)
    └── AutorizacionProyectoServiceTest.java   (NUEVO)
└── mapper/
    └── UsuarioMapperTest.java                 (NUEVO)
```

Los tests de `service/` y `mapper/` son **unitarios**: usan
`@Mock`/`@InjectMocks` de Mockito, no tocan la base de datos, corren en
milisegundos. `IkernellBackendApplicationTests` es de **integración**:
arranca Spring Boot completo (con Flyway, Hibernate, la base de datos
real) solo para confirmar que la aplicación efectivamente levanta sin
errores de configuración.

## 4. Cómo correr los tests

```bash
cd ikernell-backend

# Correr TODOS los tests del proyecto
./mvnw test

# Correr solo una clase de test
./mvnw test -Dtest=AutorizacionProyectoServiceTest

# Correr solo un método de un test
./mvnw test -Dtest=AutorizacionProyectoServiceTest#verificarPuedeGestionar_rechazaAlLider_cuandoElProyectoEsDeOtroLider

# Compilar TODO desde cero y luego correr los tests (usa esto si ves
# errores raros tipo "NoClassDefFoundError" -- normalmente significa que
# quedó código compilado viejo en target/, no que tu test esté mal)
./mvnw clean test
```

Si algo falla, Maven imprime el nombre del test y, casi siempre, la
línea exacta del `assertThat` que no se cumplió. Lee ese mensaje antes
que nada -- casi nunca hay que adivinar qué pasó.

## 5. Anatomía de un test real, línea por línea

Vamos a leer `AutorizacionProyectoServiceTest.java` (el archivo nuevo
más simple) de arriba a abajo.

```java
@ExtendWith(MockitoExtension.class)
class AutorizacionProyectoServiceTest {
```
Esta anotación le dice a JUnit "activa Mockito para esta clase" -- sin
ella, `@Mock` y `@InjectMocks` no hacen nada.

```java
    @Mock
    private UsuarioRepository usuarioRepository;
    @Mock
    private AsignacionProyectoRepository asignacionProyectoRepository;

    @InjectMocks
    private AutorizacionProyectoService autorizacionProyectoService;
```
`@Mock` crea una versión de mentira de cada repositorio (las
dependencias reales del Service, mira su constructor en
`AutorizacionProyectoService.java`). `@InjectMocks` crea el Service
DE VERDAD, pero le inyecta los mocks de arriba en vez de los
repositorios reales conectados a Postgres.

```java
    @BeforeEach
    void setUp() {
        coordinador = Usuario.builder()...build();
        liderA = Usuario.builder()...build();
        ...
    }
```
`@BeforeEach` corre ANTES de cada `@Test` de la clase. Acá se
preparan datos reutilizables (usuarios de prueba) para no repetirlos
en cada test.

```java
    @Test
    void verificarPuedeGestionar_rechazaAlLider_cuandoElProyectoEsDeOtroLider() {
```
El nombre del método ES la documentación del test. La convención de
este proyecto es `metodo_condicion_resultadoEsperado` -- con solo leer
el nombre, sin abrir el cuerpo, ya sabés qué se está probando. Si el
test falla, el nombre que aparece en la terminal te dice exactamente
qué regla de negocio se rompió.

```java
        when(usuarioRepository.findByCorreoElectronico("lider.a@ikernell.com"))
                .thenReturn(Optional.of(liderA));
        when(asignacionProyectoRepository
                .existsByUsuario_IdUsuarioAndProyecto_IdProyectoAndRolProyectoAndFechaDesvinculacionIsNull(
                        2, 77, RolProyecto.LIDER))
                .thenReturn(false);
```
Esto es el **Given**: le enseñás al mock qué responder. "Cuando te
pregunten por este correo, devolvé este usuario." "Cuando te
pregunten si el usuario 2 es líder vigente del proyecto 77, decí que
NO" (justo la situación que debería ser rechazada).

```java
        assertThatThrownBy(() -> autorizacionProyectoService.verificarPuedeGestionar("lider.a@ikernell.com", 77))
                .isInstanceOf(ForbiddenException.class);
```
Esto es el **When + Then** en una sola línea: llama al método real
(`verificarPuedeGestionar`) y verifica que lance `ForbiddenException`.
`assertThatThrownBy` es la forma de AssertJ de decir "espero que esto
explote, y quiero verificar CÓMO explotó".

Eso es todo. El 90% de los tests de este proyecto van a seguir
exactamente este patrón: mockear repositorios, llamar al Service,
verificar el resultado o la excepción.

## 6. Por qué se eligieron estas 3 piezas primero

No se escribieron tests para todo el backend de una vez -- eso sería
abrumador y la mayoría no valdría el tiempo. Se priorizaron los
lugares donde un bug silencioso sale más caro:

1. **`AutorizacionProyectoServiceTest`**: esta clase decide quién
   puede tocar qué proyecto, y la reutilizan CUATRO Services distintos
   (`ProyectoService`, `EtapaService`, `ActividadService`,
   `AsignacionProyectoService`). Un bug acá no es "un botón se ve mal",
   es "un Líder puede editar el proyecto de otro Líder". Es la pieza
   de lógica con más impacto por línea de código de todo el backend.

2. **`ProyectoServiceTest.crear_lanzaConflictException_...`**: prueba
   la corrección de la condición de carrera (C1) que se arregló
   antes en esta misma sesión -- dos altas simultáneas podían generar
   el mismo código de proyecto. Ya se había verificado a mano con 8
   peticiones curl concurrentes de verdad; este test reproduce el
   mismo escenario en milisegundos, sin necesitar threads reales ni
   una base de datos, así que corre en cada build y nunca más hay que
   repetir la prueba manual para confirmar que el fix sigue vivo.

3. **`UsuarioMapperTest`**: protege la corrección de la fuga de datos
   personales (B1) -- antes, cualquier autenticado podía leer la
   cédula y fecha de nacimiento de un compañero con solo listar
   proyectos. El test más importante de este archivo
   (`toResumen_nuncaExponeCamposSensibles_...`) ni siquiera prueba un
   caso puntual: revisa, con reflexión de Java, que la clase
   `UsuarioResumenResponse` nunca vuelva a declarar esos campos. Si en
   seis meses alguien agrega `numeroIdentificacion` a ese DTO "porque
   una pantalla nueva lo necesita", este test falla en el build, antes
   de que el código llegue a producción -- no depende de que la
   persona que lo agregó recuerde por qué ese campo no debía estar ahí.

## 7. Cómo escribir tu próximo test

Plantilla para un test nuevo sobre un Service que ya sigue el patrón
`@RequiredArgsConstructor` + repositorios inyectados (o sea, casi
cualquier Service del proyecto):

```java
@ExtendWith(MockitoExtension.class)
class MiServicioTest {

    @Mock
    private MiRepositorio miRepositorio;
    // ...un @Mock por cada dependencia del constructor de MiServicio

    @InjectMocks
    private MiServicio miServicio;

    @Test
    void metodo_condicion_resultadoEsperado() {
        // Given: enseñale a los mocks qué devolver
        when(miRepositorio.findById(1)).thenReturn(Optional.of(algo));

        // When: llamá al método real
        var resultado = miServicio.metodoQueEstasProbando(1);

        // Then: verificá el resultado
        assertThat(resultado.getAlgo()).isEqualTo(valorEsperado);

        // (si esperás una excepción en vez de un resultado, usá
        // assertThatThrownBy como en la sección 5)
    }
}
```

Checklist antes de dar por terminado un test nuevo:

- [ ] El nombre del método sigue `metodo_condicion_resultadoEsperado`.
- [ ] Solo mockeaste lo que el método bajo prueba REALMENTE llama (si
      Mockito se queja de "unnecessary stubbing", ver sección 8).
- [ ] El test falla si revertís el fix a mano (probá comentando la
      línea corregida y corriendo el test -- si sigue pasando, el test
      no está probando nada real). Así se verificó `UsuarioMapperTest`
      en esta misma sesión: se reintrodujo el campo sensible a
      propósito y se confirmó que el test SÍ fallaba, antes de
      revertir el cambio.
- [ ] `./mvnw clean test` pasa completo, no solo tu clase nueva.

## 8. Problemas que ya nos encontramos (para que no te tomen por sorpresa)

**`UnnecessaryStubbingException`**: Mockito es estricto -- si en
`@BeforeEach` configurás un mock (`when(...)`) que un test en
particular nunca termina usando, ESE test falla, aunque el mock sí lo
usen otros tests de la misma clase. Pasó exactamente esto al agregar
el test de `crear()` a `ProyectoServiceTest`: el `@BeforeEach` tenía un
`when(proyectoRepository.findById(1))` que solo usan los tests de
`cambiarEstado()`. Solución: marcarlo como
`Mockito.lenient().when(...)` para decirle a Mockito "esta
configuración es opcional, no todos los tests tienen que usarla".

**`NoClassDefFoundError` o `NoSuchBeanDefinitionException` raros**:
casi siempre significa que `target/` tiene clases compiladas de una
corrida anterior que no coinciden con el código fuente actual (por
ejemplo, después de un test que falló a mitad de compilación). Se
arregla con `./mvnw clean test` en vez de `./mvnw test`.

## 9. Qué NO testear

No todo necesita un test. Evitá tests para:

- Getters/setters generados por Lombok (`@Getter`, `@Setter`) -- no
  tienen lógica propia que pueda romperse.
- DTOs de solo datos (records, clases `@Builder` sin métodos).
- Código de configuración de Spring (`@Configuration`) salvo que tenga
  lógica condicional real.
- Los `Controller` línea por línea si ya hay un test del `Service`
  que llaman -- el `@PreAuthorize` de los endpoints de rol (como los
  nuevos `/api/metricas/*`) ya se verificó a mano con usuarios reales
  de cada rol durante esta sesión; automatizar ESO con
  `@WebMvcTest` + `MockMvc` sería un buen próximo paso, pero es un
  patrón distinto al de esta guía (requiere simular JWT/autenticación)
  y se dejó fuera a propósito para no mezclar dos técnicas nuevas de
  una vez.

## 10. Próximos pasos sugeridos (cuando te sientas listo)

En orden de dificultad creciente:

1. Agregá un test más al patrón de la sección 7 sobre algún Service
   que todavía no tenga ninguno (`EtapaService`, `RegistroErrorService`,
   `InterrupcionService` son buenos candidatos -- reutilizan
   `AutorizacionProyectoService`, así que ya tenés el ejemplo de cómo
   mockearlo).
2. Un test con `@DataJpaTest` para probar una `@Query` de un
   repositorio contra una base de datos real de prueba (H2 en memoria,
   o Testcontainers con Postgres real) -- útil para las queries nativas
   de `MetricasService` que usan `DATE()` de Postgres.
3. Un test de Controller con `@WebMvcTest` + `MockMvc`, simulando un
   usuario autenticado con un rol específico, para automatizar la
   verificación de `@PreAuthorize` que hoy se hace a mano con curl.
4. Frontend: el proyecto no tiene ningún framework de testing instalado
   todavía (no hay `npm test`). Cuando llegue el momento, Vitest es la
   opción más simple para un proyecto Vite -- pero es una sesión aparte,
   con su propio setup.
