<template>
    <!-- Modal general con clases dinámicas -->
    <div class="modal fade" :id="modalId" tabindex="-1" aria-labelledby="modalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <!-- Encabezado del modal con color dinámico -->
                <div class="modal-header" :class="headerClass">
                    <h5 class="modal-title" :id="modalLabel">{{ title }}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <!-- Cuerpo del modal con mensaje y imagen -->
                <div class="modal-body text-center">
                    <img :src="imageSrc" alt="Modal Image" class="img-fluid rounded-circle">
                    <p class="mt-3 fw-bold fs-5">{{ message }}</p>
                </div>
                <!-- Pie del modal -->
                <div class="modal-footer">
                    <button type="button" :class="footerButtonClass" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ModalComp',
    props: {
        modalId: String,
        title: String,
        message: String,
        imageSrc: String,
        headerClass: String,
        footerButtonClass: String,
        modalLabel: String
    }
}
</script>

<style scoped></style>
