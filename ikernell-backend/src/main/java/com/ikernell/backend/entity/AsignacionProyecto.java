package com.ikernell.backend.entity;

import com.ikernell.backend.converter.RolProyectoConverter;
import com.ikernell.backend.enums.RolProyecto;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Table(name = "asignacion_proyecto")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AsignacionProyecto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_asignacion_proyecto")
    private Integer idAsignacionProyecto;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_proyecto", nullable = false)
    private Proyecto proyecto;

    @Convert(converter = RolProyectoConverter.class)
    @Column(name = "rol_proyecto", nullable = false, length = 30)
    private RolProyecto rolProyecto;

    @Column(name = "fecha_asignacion", nullable = false)
    @Builder.Default
    private LocalDate fechaAsignacion = LocalDate.now();

    @Column(name = "fecha_desvinculacion")
    private LocalDate fechaDesvinculacion;
}
