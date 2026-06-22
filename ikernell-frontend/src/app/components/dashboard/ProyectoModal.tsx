import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "../ui/dialog";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

interface Props {
    open: boolean;
    onClose: () => void;

    proyecto: any;
    setProyecto: (proyecto: any) => void;

    onGuardar: () => void;

    editando: boolean;
}

export default function ProyectoModal({
    open,
    onClose,
    proyecto,
    setProyecto,
    onGuardar,
    editando,
}: Props) {
    return (
        <Dialog
            open={open}
            onOpenChange={onClose}
        >
            <DialogContent
                className="sm:max-w-[650px]"
            >
                <DialogHeader>
                    <DialogTitle>
                        {editando
                            ? "Editar Proyecto"
                            : "Nuevo Proyecto"}
                    </DialogTitle>
                </DialogHeader>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                        marginTop: "10px",
                    }}
                >
                    <Input
                        placeholder="Código"
                        value={proyecto.codProyecto}
                        onChange={(e) =>
                            setProyecto({
                                ...proyecto,
                                codProyecto: e.target.value,
                            })
                        }
                    />

                    <Input
                        placeholder="Nombre"
                        value={proyecto.nombreProyecto}
                        onChange={(e) =>
                            setProyecto({
                                ...proyecto,
                                nombreProyecto: e.target.value,
                            })
                        }
                    />

                    <Textarea
                        placeholder="Descripción"
                        value={
                            proyecto.descripcionProyecto
                        }
                        onChange={(e) =>
                            setProyecto({
                                ...proyecto,
                                descripcionProyecto:
                                    e.target.value,
                            })
                        }
                    />

                    <div
                        style={{
                            display: "flex",
                            gap: "12px",
                        }}
                    >
                        <Input
                            type="date"
                            value={
                                proyecto.fechaInicioProyecto
                            }
                            onChange={(e) =>
                                setProyecto({
                                    ...proyecto,
                                    fechaInicioProyecto:
                                        e.target.value,
                                })
                            }
                        />

                        <Input
                            type="date"
                            value={
                                proyecto.fechaFinProyecto
                            }
                            onChange={(e) =>
                                setProyecto({
                                    ...proyecto,
                                    fechaFinProyecto:
                                        e.target.value,
                                })
                            }
                        />
                    </div>

                    <div
                        style={{
                            display: "flex",
                            justifyContent:
                                "flex-end",
                            gap: "10px",
                            marginTop: "10px",
                        }}
                    >
                        <Button
                            variant="outline"
                            onClick={onClose}
                        >
                            Cancelar
                        </Button>

                        <Button
                            onClick={onGuardar}
                        >
                            {editando
                                ? "Actualizar"
                                : "Guardar"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}