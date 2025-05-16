import {createRouter, createWebHashHistory} from 'vue-router'
import IndexLayout from "@/components/router/IndexLayout.vue";
import SettingsPage from "@/components/router/SettingsPage.vue";
import SettingsSystem from "@/components/router/settings/SettingsSystem.vue";
import SettingsNetwork from "@/components/router/settings/SettingsNetwork.vue";
import SettingsDio from "@/components/router/settings/SettingsDio.vue";
import SettingsOneWire from "@/components/router/settings/SettingsOneWire.vue";
import ClimatePanel from "@/components/router/panels/ClimatePanel.vue";
import HomePanel from "@/components/router/panels/HomePanel.vue";
import InputsOutputsPanel from "@/components/router/panels/InputsOutputsPanel.vue";
import OneWirePanel from "@/components/router/panels/OneWirePanel.vue";
import SettingsApi from "@/components/router/settings/SettingsApi.vue";
import UpdatesPage from "@/components/router/UpdatesPage.vue";
import SettingsClimate from "@/components/router/settings/SettingsClimate.vue";
import RfPanel from "@/components/router/panels/RfPanel.vue";
import SettingsRf from "@/components/router/settings/SettingsRf.vue";
import AnalogSensorsPanel from "@/components/router/panels/AnalogSensorsPanel.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: IndexLayout,
      children: [
        {
          path: 'home',
          name: 'home_panel',
          component: HomePanel
        }, {
          path: 'analog',
          name: 'analog',
          component: AnalogSensorsPanel
        },
        {
          path: 'climate',
          name: 'climate_panel',
          component: ClimatePanel
        },
        {
          path: 'dio',
          name: 'dio_panel',
          component: InputsOutputsPanel
        },
        {
          path: '1wire',
          name: 'one_wire_panel',
          component: OneWirePanel
        },
        {
          path: 'rf',
          name: 'rf_panel',
          component: RfPanel
        },
      ]
    },
    {
      path: '/updates',
      component: UpdatesPage,
      name: 'updates'
    },
    {
      path: '/settings',
      component: SettingsPage,
      children: [
        {
          path: 'system',
          name: 'settings',
          component: SettingsSystem
        },
        {
          path: 'network',
          name: 'settings_nw',
          component: SettingsNetwork
        },
        {
          path: 'climate',
          name: 'settings_ot',
          component: SettingsClimate
        },
        {
          path: 'dio',
          name: 'settings_dio',
          component: SettingsDio
        },
        {
          path: 'rf',
          name: 'settings_rf',
          component: SettingsRf
        },
        {
          path: '1wire',
          name: 'settings_1wire',
          component: SettingsOneWire
        },
        {
          path: 'api',
          name: 'settings_api',
          component: SettingsApi
        }
      ]
    },

  ],
})

export default router
