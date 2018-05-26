<template>
     <div class="row justify-content-sm-center">
      <div class="col">
        <h2>{{$t('teams.invitations')}}</h2>
        <table class="table table-striped">
          <tr>
            <th>{{ $t('teams.invitation_group_name') }}</th>
            <th></th>
          </tr>

          <tr>
            <td>
              Platzhalter für Einladungsteam
            </td>

            <td class="actions">
              <button
                class="btn btn-success">
                <i class="fas fa-check"></i>
                {{$t('teams.invitation_accept')}}
              </button>
              <button
                class="btn btn-danger">
                <i class="fas fa-times"></i>
                {{$t('teams.invitation_deny')}}
              </button>
            </td>

          </tr>
        </table>
      </div>
    </div>
</template>
