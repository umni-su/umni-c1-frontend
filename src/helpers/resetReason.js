export const ESP_RST_UNKNOWN = 0    //!< Reset reason can not be determined
export const ESP_RST_POWERON = 1    //!< Reset due to power-on event
export const ESP_RST_EXT = 2        //!< Reset by external pin (not applicable for ESP32)
export const ESP_RST_SW = 3         //!< Software reset via esp_restart
export const ESP_RST_PANIC = 4      //!< Software reset due to exception/panic
export const ESP_RST_INT_WDT = 5    //!< Reset (software or hardware) due to interrupt watchdog
export const ESP_RST_TASK_WDT = 6   //!< Reset due to task watchdog
export const ESP_RST_WDT = 7        //!< Reset due to other watchdogs
export const ESP_RST_DEEPSLEEP = 8  //!< Reset after exiting deep sleep mode
export const ESP_RST_BROWNOUT = 9   //!< Brownout reset (software or hardware)
export const ESP_RST_SDIO = 10       //!< Reset over SDIO
export const ESP_RST_USB = 11        //!< Reset by USB peripheral
export const ESP_RST_JTAG = 12       //!< Reset by JTAG
export const ESP_RST_EFUSE = 13      //!< Reset due to efuse error
export const ESP_RST_PWR_GLITCH = 14 //!< Reset due to power glitch detected
export const ESP_RST_CPU_LOCKUP = 15 //!< Reset due to CPU lock up

export function resetErrorCodeToString(reason) {
    switch (reason) {
        case ESP_RST_UNKNOWN:
            return 'Unknown'

        case ESP_RST_POWERON:
            return 'Power on'

        case ESP_RST_EXT:
            return 'External trigger'

        case ESP_RST_SW:
            return 'Software reset'

        case ESP_RST_PANIC:
            return 'Exception'

        case ESP_RST_INT_WDT:
            return 'Interrupt WDT'

        case ESP_RST_TASK_WDT:
            return 'Task WDT'

        case ESP_RST_WDT:
            return 'Other WDT'

        case ESP_RST_DEEPSLEEP:
            return 'Deep sleep'

        case ESP_RST_BROWNOUT:
            return 'Brownout'

        case ESP_RST_SDIO:
            return 'Reset SDIO'

        case ESP_RST_USB:
            return 'USB peripheral'

        case ESP_RST_JTAG:
            return 'JTAG reset'

        case ESP_RST_EFUSE:
            return 'Efuse error'

        case ESP_RST_PWR_GLITCH:
            return 'Power glitch'

        case ESP_RST_CPU_LOCKUP:
            return 'CPU lockup'


    }
}