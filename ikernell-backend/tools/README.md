Audit Tool — IKernell Backend V2

Instalación (una sola vez)

En Ubuntu 22.04, la forma más confiable es con apt (evita conflictos de pip):

bashsudo apt install python3-yaml

Alternativa si prefieres pip (solo si tu versión de pip soporta la bandera):

bashpip3 install pyyaml --break-system-packages
# o, si eso falla por versión vieja de pip:
pip3 install --user pyyaml

Estructura a copiar en la raíz del proyecto (junto a pom.xml)

tu-proyecto/
├── pom.xml
├── audit_config.yaml       <- copiar aquí
├── run_audit.sh            <- copiar aquí
├── schema.sql               <- OPCIONAL, ver abajo
└── tools/
└── audit_backend.py     <- copiar aquí

Uso

bashchmod +x run_audit.sh
./run_audit.sh

Esto genera:


audit_output/latest.md — el reporte más reciente
audit_output/history/<timestamp>.md — copia histórica
audit_output/history/<timestamp>.json — snapshot para comparar


Cada vez que lo corras, la sección "8. Cambios desde la última auditoría"
del reporte te dice qué se resolvió y qué apareció nuevo desde la corrida anterior.

Cruce con base de datos (opcional, punto 1 de tu lista)

Para que la sección de "tablas sin entidad / entidades sin tabla" funcione,
genera un dump de esquema desde pgAdmin o psql:

bashpg_dump --schema-only -h localhost -U tu_usuario tu_basededatos > schema.sql

Colócalo en la raíz del proyecto (mismo nivel que pom.xml). Si no existe,
el script simplemente omite esa sección con una nota, sin fallar.

Ajustar el config

audit_config.yaml ya trae la lista de las 15 entidades planeadas del dominio
completo. Actualízalo si el dominio cambia. También puedes agregar/quitar
paquetes, sufijos de DTO a validar, o anotaciones de Bean Validation a buscar.

Limitaciones honestas


Es análisis por regex, no un parser Java real (AST). Para casos de código
con formato muy atípico puede haber falsos positivos/negativos, especialmente
en el check de @Transactional (heurística explícita, no 100% precisa).
Trata el reporte como lista de revisión manual, no como verdad absoluta.