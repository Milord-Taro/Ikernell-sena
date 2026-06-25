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

    etapa: any;
    setEtapa: (etapa: any) => void;

    onGuardar: () => void;

    editando: boolean;
}

export default function EtapaModal({
    open,
    onClose,
    etapa,
    setEtapa,
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
                            ? "Editar Etapa"
                            : "Nueva Etapa"}
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
                        placeholder="Ej: ETP-001"
                        value={etapa.codEtapa}
                        onChange={(e) =>
                            setEtapa({
                                ...etapa,
                                codEtapa: e.target.value,
                            })
                        }
                    />

                    <Input
                        placeholder="Nombre"
                        value={etapa.nombreEtapa}
                        onChange={(e) =>
                            setEtapa({
                                ...etapa,
                                nombreEtapa: e.target.value,
                            })
                        }
                    />

                    <Textarea
                        placeholder="Descripción"
                        value={
                            etapa.descripcionEtapa
                        }
                        onChange={(e) =>
                            setEtapa({
                                ...etapa,
                                descripcionEtapa: e.target.value,
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
                            value={etapa.fechaEtapa}
                            onChange={(e) =>
                                setEtapa({
                                    ...etapa,
                                    fechaEtapa: e.target.value,
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