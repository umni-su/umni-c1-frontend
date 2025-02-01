/**
 * CHIP_ESP32  = 1, //!< ESP32
 *     CHIP_ESP32S2 = 2, //!< ESP32-S2
 *     CHIP_ESP32S3 = 9, //!< ESP32-S3
 *     CHIP_ESP32C3 = 5, //!< ESP32-C3
 *     CHIP_ESP32C2 = 12, //!< ESP32-C2
 *     CHIP_ESP32C6 = 13, //!< ESP32-C6
 *     CHIP_ESP32H2 = 16, //!< ESP32-H2
 *     CHIP_ESP32P4 = 18, //!< ESP32-P4
 *     CHIP_POSIX_LINUX = 999, //!< The code is running on POSIX/Linux simulator
 */
export const CHIP_ESP32 = 1 //!< ESP32
export const CHIP_ESP32S2 = 2 //!< ESP32-S2
export const CHIP_ESP32S3 = 9 //!< ESP32-S3
export const CHIP_ESP32C3 = 5 //!< ESP32-C3
export const CHIP_ESP32C2 = 12 //!< ESP32-C2
export const CHIP_ESP32C6 = 13 //!< ESP32-C6
export const CHIP_ESP32H2 = 16 //!< ESP32-H2
export const CHIP_ESP32P4 = 18 //!< ESP32-P4
export const CHIP_POSIX_LINUX = 999 //!< The code is running on POSIX/Linux simulator

export function chipInfoToString(chip) {
    switch (chip) {
        case CHIP_ESP32:
            return 'ESP32'
        case CHIP_ESP32S2:
            return 'ESP32S2'
        case CHIP_ESP32S3:
            return 'ESP32S3'
        case CHIP_ESP32C3:
            return 'ESP32C3'
        case CHIP_ESP32C2:
            return 'ESP32C2'
        case CHIP_ESP32C6:
            return 'ESP32C6'
        case CHIP_ESP32H2:
            return 'CHIP_ESP32H2'
        case CHIP_ESP32P4:
            return 'ESP32P4'
        case CHIP_POSIX_LINUX:
            return 'POSIX_LINUX'
    }
}