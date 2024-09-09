<template>
    <!-- Modal de éxito -->
    <div class="modal fade" id="successModal" tabindex="-1" aria-labelledby="successModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header bg-success text-white">
                    <h5 class="modal-title" id="successModalLabel">¡Felicidades!</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-center">
                    <img src="https://i.pinimg.com/236x/40/76/8e/40768e50330180d9249bf3921def7c24.jpg"
                        alt="Pikachu sorprendido" class="img-fluid rounded-circle">
                    <p class="mt-3 fw-bold fs-5">¡Has adivinado el Pokémon!</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-success" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal de error -->
    <div class="modal fade" id="errorModal" tabindex="-1" aria-labelledby="errorModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header bg-danger text-white">
                    <h5 class="modal-title" id="errorModalLabel">¡Oh no!</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body text-center">
                    <img src="https://i.pinimg.com/474x/46/bc/f7/46bcf71aaa097cca204f5dbe50240186.jpg"
                        alt="Pikachu durmiendo" class="img-fluid rounded-circle">
                    <p class="mt-3 fw-bold fs-5">¡Inténtalo de nuevo!</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ModalComp',
}
</script>
<style scoped></style>