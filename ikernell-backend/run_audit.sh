#!/bin/bash
# Wrapper simple. Ejecutar desde la raíz del proyecto Spring Boot
# (donde está pom.xml), con tools/ y audit_config.yaml copiados ahí.
python3 tools/audit_backend.py --config audit_config.yaml --project-root .
