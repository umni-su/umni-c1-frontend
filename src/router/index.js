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

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: IndexLayout,
      children: [
        {
          path: '',
          name: 'home_panel',
          component: HomePanel
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
      ]
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
          path: 'dio',
          name: 'settings_dio',
          component: SettingsDio
        },
        {
          path: '1wire',
          name: 'settings_1wire',
          component: SettingsOneWire
        }
      ]
    },

  ],
})

export default router
